package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Notification;

import java.util.List;

public interface INotificationService {
    public Notification addNotifcation(Notification notification);
    public List<Notification>getNotifcations();
    public void deleteNotif(String idn );
    public void deleteAllNotif();

}
