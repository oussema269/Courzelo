package com.example.courzeloproject.Repository;

import com.example.courzeloproject.Entite.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INotificationRepository  extends MongoRepository<Notification,String > {

}
