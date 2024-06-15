package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Notification;
import com.example.courzeloproject.Service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("notification")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {
    @Autowired
    INotificationService iNotificationService;
    @PostMapping("/addNotifcation")
    public Notification addNotifcation( @RequestBody  Notification notification) {
        return iNotificationService.addNotifcation(notification);
    }
        @GetMapping("/getNotifcations")
        public List<Notification> getNotifcations() {
        return iNotificationService.getNotifcations();
        }
        @DeleteMapping("/deleteNotif/{idn}")
        public void deleteNotif( @PathVariable("idn") String idn) {
         iNotificationService.deleteNotif(idn);
        }
        @DeleteMapping("/deleteAllNotif")
        public void deleteAllNotif(){
        iNotificationService.deleteAllNotif();
        }


}
