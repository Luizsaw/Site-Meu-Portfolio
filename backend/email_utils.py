import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

load_dotenv()

def enviar_email(ms):
    msg = EmailMessage()
    msg['Subject'] = "Novo Contato Recebido"
    msg['From'] = os.getenv("EMAIL_USER")
    msg['To'] = os.getenv("EMAIL_PROFISSIONAL")

    msg.set_content(f"""
Nova Menssagem:

Nome: {ms.nome}
Email: {ms.email}
Assunto: {ms.assunto}
Menssagem: {ms.menssagem}
    """)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
        smtp.send_message(msg)

