package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Message;
import com.pusher.rest.Pusher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api")
@RestController
public class ChatController {
    @PostMapping("/messages")
    void message(@RequestBody Message message){
        Pusher pusher = new Pusher("1774582", "b549ae65445917884c97", "526d26540c341758d490");
        pusher.setCluster("eu");
        pusher.setEncrypted(true);
        pusher.trigger("Courzelou", "message", message);

    }
}
