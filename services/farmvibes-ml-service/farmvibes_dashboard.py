import streamlit as st
import bigframes.pandas as bpd

# 1. Initialize BigFrames ordering mode (Best Practice)
bpd.options.bigquery.ordering_mode = 'partial'

st.set_page_config(page_title="Agri-Agentic Dashboard", layout="wide")
st.title("🌾 Airi + FarmVibes: BigQuery ML Dashboard")

st.markdown("""
Welcome to the AI-powered agricultural dashboard. 
This app uses **BigFrames** to process data at BigQuery scale, and **BigQuery ML** for forecasting.
""")

# Note: In a real environment, you would need to set up Google Cloud credentials.
st.info("Ensure you are authenticated with `gcloud auth application-default login` before running this app.")

try:
    st.subheader("Raw Data Preview")
    df = bpd.read_csv("mock_agri_data.csv")
    
    # 3. Use peek() for fast previewing instead of head()
    st.dataframe(df.peek(5).to_pandas())
    
    st.subheader("Data Visualization")
    # 4. Aggregations using BigFrames before plotting locally
    df['moisture_bin'] = df['soil_moisture'] // 10 * 10
    agg_df = df.groupby('moisture_bin')['crop_yield_kg_per_ha'].mean()
    st.bar_chart(agg_df.to_pandas())

    st.subheader("BigQuery AI: Anomaly Detection")
    st.markdown("""
    In a fully configured GCP environment, we would use `AI.DETECT_ANOMALIES` 
    to find unusual drops in crop yield via a query like:
    ```sql
    SELECT * FROM ML.DETECT_ANOMALIES(
        MODEL `farmvibes_dataset.yield_anomaly_model`,
        TABLE `farmvibes_dataset.crop_yields`
    )
    ```
    """)
except Exception as e:
    st.error(f"Could not connect to BigQuery: {e}")
