package com.example.courzeloproject.Service;
import com.example.courzeloproject.dto.MailDto;
public interface IEmailService {
    String sendEmail( MailDto email);
}
