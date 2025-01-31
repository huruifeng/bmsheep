import smtplib
from email.header import Header
from email.mime.text import MIMEText


class myMail163(object):
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


class myMailtrap(object):
    def __init__(self):
        self.SMTP_SERVER = "live.smtp.mailtrap.io"
        self.SMTP_PORT = 587
        self.SENDER_EMAIL = "SheepDB Team <hello@casegreen.info>"
        self.SENDER_PASSWORD = "5bf909467d2bd7009c7cb9197529b545"  # Use the generated App Password

    def send_email(self, to_account, subject, content):
        try:
            # create msg
            msg = MIMEText(content, 'html', 'utf-8')
            msg['Subject'] = Header(subject, 'utf-8')  # subject
            msg['From'] = self.SENDER_EMAIL
            msg['To'] = to_account

            email_client = smtplib.SMTP(self.SMTP_SERVER, self.SMTP_PORT)
            email_client.starttls()  # Puts connection to SMTP server in TLS mode
            email_client.login("api", self.SENDER_PASSWORD)
            email_client.sendmail(self.SENDER_EMAIL, to_account, msg.as_string())

            email_client.quit()

            return True

        except Exception as e:
            print(f"Error sending email: {e}")
            return False


def send_email_x(to_account, subject, content):
    mail_163 = myMail163()
    sent_163 = mail_163.send_email(to_account, subject, content)
    if not sent_163:
        mail_trap = myMailtrap()
        sent_trap = mail_trap.send_email(to_account, subject, content)
        if not sent_trap:
            print("Error sending verification email")
            return False
        else:
            print("Verification email sent successfully by Mailtrap")
            return True
    else:
        print("Verification email sent successfully by Mail163")
        return True


def send_verification_email(email, verification_code):
    print("Sending verification email...")
    subject = "[SheepDB]Verification Code"
    content = (f"Welcome to SheepDB!<br/>"
               f"<br/>Your verification code is: <b> {verification_code} </b> <br/>"
               f"Please use this code to verify your account. The code is valid for 24 hours. <br/>"
               f"<br/>Thanks for using SheepDB!"
               f"<br/><br/>SheepDB Team"
               )
    sent = send_email_x(email, subject, content)
    return sent


