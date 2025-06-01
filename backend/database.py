import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def insert_menssagem(ms):
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS menssagens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            email VARCHAR(100),
            assunto VARCHAR(100),
            menssagem VARCHAR(500)
        );
    """)
    cursor.execute("""
        INSERT INTO menssagens (nome, email, assunto, menssagem)
        VALUES (%s, %s, %s, %s, %s, %s);
    """, (ms.nome, ms.email, ms.assunto, ms.menssagem))
    conn.commit()
    cursor.close()
    conn.close()

