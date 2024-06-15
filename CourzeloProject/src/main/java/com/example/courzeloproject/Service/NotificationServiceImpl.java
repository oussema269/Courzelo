package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Notification;
import com.example.courzeloproject.Repository.INotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements INotificationService{
    @Autowired
    INotificationRepository iNotificationRepository;
    @Override
    public Notification addNotifcation(Notification notification) {
        return iNotificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotifcations() {
        return iNotificationRepository.findAll();
    }

    @Override
    public void deleteNotif(String idn) {
        iNotificationRepository.deleteById(idn);
    }


    @Override
    public void deleteAllNotif() {
         iNotificationRepository.deleteAll();
    }
}
