import smtplib
from email.header import Header
from email.mime.text import MIMEText

# 第三方 SMTP 服务
SMTP_host = "smtp.163.com"  # SMTP服务器
from_account = "SheepDBTeam@hotmail.com"  # 用户名
from_passwd = "thesheep2025@hotmail"  # 授权密码，非登录密码


def send_email(to_account, subject, content):
    email_client = smtplib.SMTP("smtp-mail.outlook.com",587)
    email_client.ehlo()  # Hostname to send for this command defaults to the fully qualified domain name of the local host.
    email_client.starttls()  # Puts connection to SMTP server in TLS mode
    email_client.ehlo()
    email_client.login(from_account, from_passwd)
    # create msg
    msg = MIMEText(content, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')  # subject
    msg['From'] = from_account
    msg['To'] = to_account
    email_client.sendmail(from_account, to_account, msg.as_string())

    email_client.quit()

def send_verification_email(email, verification_code):
    try:
        subject = "[SheepDB]Verification Code"
        content = (f"Welcome to SheepDB!\n"
                   f"\nYour verification code is: {verification_code}\n"
                   f"Please use this code to verify your account. The code is valid for 24 hours. \n"
                   f"\nThanks for using SheepDB!"
                   f"\n\nSheepDB Team"
                   )
        send_email(email, subject, content)
        return True
    except Exception as e:
        return False




