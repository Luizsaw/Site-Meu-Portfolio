from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import insert_menssagem
from email_utils import enviar_email
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #MV ip
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Menssagem (BaseModel):
    nome: str
    email: str
    assunto: str
    menssagem: str

@app.post("/enviar_msg")
def enviar(ms: Menssagem):
    try:
        insert_menssagem(ms)
        enviar_email(ms)
        return {"mensagem": "Menssagem envido com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

