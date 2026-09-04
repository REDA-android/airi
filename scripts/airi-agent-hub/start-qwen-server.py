import argparse
import json
import time
from typing import List, Optional
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sse_starlette.sse import EventSourceResponse

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

@app.on_event("startup")
async def startup_event():
    print("\n=======================================================")
    print("  🚀 AIRI Qwen Server is running on http://127.0.0.1:8000")
    print("  Endpoint: http://127.0.0.1:8000/v1")
    print("  Dans AIRI : Selectionnez 'Compatible avec OpenAI'")
    print("  Base URL  : http://127.0.0.1:8000/v1")
    print("  API Key   : qwen-local (ou n'importe quoi)")
    print("=======================================================\n")

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
    
    # Reponse par defaut du serveur Qwen Bridge
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
                yield f"data: {json.dumps(chunk)}\n\n"
            yield "data: [DONE]\n\n"

        return EventSourceResponse(event_generator(), media_type="text/event-stream")

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
    uvicorn.run(app, host="127.0.0.1", port=8000)
