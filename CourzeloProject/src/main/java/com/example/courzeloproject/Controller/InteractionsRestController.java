package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Interactions;
import com.example.courzeloproject.Repository.InteractionsRepository;
import com.example.courzeloproject.Service.IInteractionsService;
import com.example.courzeloproject.Service.InteractionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class InteractionsRestController {

    @Autowired
    private IInteractionsService iInteractionsService;

    
    @DeleteMapping("deteInter/{id}")
    public String deleteInteraction(@PathVariable("id") String id){
        iInteractionsService.deleteInteraction(id);
        return "Blog Deleted";
    }

}
