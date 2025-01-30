import smtplib
from email.header import Header
from email.mime.text import MIMEText

# Gmail SMTP Configuration
SMTP_SERVER = "live.smtp.mailtrap.io"
SMTP_PORT = 587
SENDER_EMAIL = "SheepDB Team <hello@casegreen.info>"
SENDER_PASSWORD = "5bf909467d2bd7009c7cb9197529b545"  # Use the generated App Password



def send_email(to_account, subject, content):
    email_client = smtplib.SMTP(SMTP_SERVER,SMTP_PORT)
    email_client.starttls()  # Puts connection to SMTP server in TLS mode
    email_client.login("api", SENDER_PASSWORD)
    # create msg
    msg = MIMEText(content, 'html', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')  # subject
    msg['From'] = SENDER_EMAIL
    msg['To'] = to_account
    email_client.sendmail(SENDER_EMAIL, to_account, msg.as_string())

    email_client.quit()

def send_verification_email(email, verification_code):
    print("Sending verification email...")
    subject = "[SheepDB]Verification Code"
    content = (f"Welcome to SheepDB!<br/>"
               f"<br/>Your verification code is: <b> {verification_code} </b> <br/>"
               f"Please use this code to verify your account. The code is valid for 24 hours. <br/>"
               f"<br/>Thanks for using SheepDB!"
               f"<br/><br/>SheepDB Team"
               )
    send_email(email, subject, content)
    print("Verification email sent successfully")
    return True


send_verification_email("huruifeng.cn@hotmail.com", "123456")
