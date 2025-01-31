import smtplib
from email.header import Header
from email.mime.text import MIMEText

# SMTP Configuration
# SMTP_SERVER = "live.smtp.mailtrap.io"
# SMTP_PORT = 587
# SENDER_EMAIL = "SheepDB Team <hello@casegreen.info>"
# SENDER_PASSWORD = "5bf909467d2bd7009c7cb9197529b545"  # Use the generated App Password

class Mail163:
    def __init__(self):
        self.SMTP_SERVER = "smtp.163.com"
        self.SMTP_PORT = 465
        self.SENDER_EMAIL = "sheepdbteam@163.com"
        self.SENDER_PASSWORD = "PHhPYUKqB8Sc7MTi"  # Use the generated App Password


    def send_email(self,to_account, subject, content):
        try:
            msg = MIMEText(content, 'html', 'utf-8')
            msg['Subject'] = Header(subject, 'utf-8')  # subject
            msg['From'] = self.SENDER_EMAIL
            msg['To'] = to_account

            email_client = smtplib.SMTP_SSL(self.SMTP_SERVER,self.SMTP_PORT)
            email_client.login(self.SENDER_EMAIL, self.SENDER_PASSWORD)
            email_client.sendmail(self.SENDER_EMAIL, to_account, msg.as_string())

            email_client.quit()

            return True

        except Exception as e:
            print(f"Error sending email: {e}")
            return False



def send_verification_email(email, verification_code):
    print("Sending verification email...")
    subject = "[SheepDB]Verification Code"
    content = (f"Welcome to SheepDB!<br/>"
               f"<br/>Your verification code is: <b> {verification_code} </b> <br/>"
               f"Please use this code to verify your account. The code is valid for 24 hours. <br/>"
               f"<br/>Thanks for using SheepDB!"
               f"<br/><br/>SheepDB Team"
               )
    mail_163 = Mail163()
    sent = mail_163.send_email2(email, subject, content)
    if not sent:
        print("Error sending verification email2")
    else:
        print("Verification email sent successfully2")
    return True


send_verification_email("huruifeng.cn@hotmail.com", "123456")
