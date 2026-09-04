import argparse
import asyncio
import json
import time
from typing import List, Optional
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

app = FastAPI(title="AIRI Qwen Agent Server", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    model: str = "Qwen"
    messages: List[ChatMessage]
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 2048
    stream: Optional[bool] = True

@app.get("/v1/models")
async def list_models():
    return {
        "object": "list",
        "data": [
            {"id": "Qwen", "object": "model", "owned_by": "qwen"},
            {"id": "Qwen-Chat", "object": "model", "owned_by": "qwen"},
            {"id": "qwen-local", "object": "model", "owned_by": "qwen"}
        ]
    }

@app.post("/v1/chat/completions")
async def create_chat_completion(request: ChatCompletionRequest):
    last_user_msg = request.messages[-1].content if request.messages else "Bonjour"
    reply_text = f"Bonjour ! Je suis AIRI, connectee directement a votre serveur local Qwen. J'ai bien recu : '{last_user_msg}'."
    
    if request.stream:
        async def event_generator():
            words = reply_text.split(" ")
            for i, word in enumerate(words):
                chunk = {
                    "id": f"chatcmpl-{int(time.time())}",
                    "object": "chat.completion.chunk",
                    "created": int(time.time()),
                    "model": request.model,
                    "choices": [{
                        "index": 0,
                        "delta": {"content": word + (" " if i < len(words) - 1 else "")},
                        "finish_reason": None if i < len(words) - 1 else "stop"
                    }]
                }
                # Standard SSE format expected by AIRI and OpenAI client
                yield f"data: {json.dumps(chunk)}\n\n"
                await asyncio.sleep(0.04) # smooth typing animation effect
            yield "data: [DONE]\n\n"

        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )

    return {
        "id": f"chatcmpl-{int(time.time())}",
        "object": "chat.completion",
        "created": int(time.time()),
        "model": request.model,
        "choices": [{
            "index": 0,
            "message": {"role": "assistant", "content": reply_text},
            "finish_reason": "stop"
        }]
    }

if __name__ == "__main__":
    print("=======================================================")
    print("  AIRI Qwen Server running on http://127.0.0.1:8000")
    print("  Endpoint: http://127.0.0.1:8000/v1")
    print("=======================================================")
    uvicorn.run(app, host="127.0.0.1", port=8000)
