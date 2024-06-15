package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Reclamtion;
import com.example.courzeloproject.Service.ReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reclamation")
@RequiredArgsConstructor
public class ReclamationController {
    @Autowired
    ReclamationService reclamationService;

    @PostMapping("/addReclamation")
    public Reclamtion addReclamation(@RequestBody Reclamtion reclamtion) {
        return reclamationService.addReclamation(reclamtion);
    }

    @PutMapping("/updateRclamation")
    public Reclamtion updateReclamation(@RequestBody Reclamtion reclamtion) {
        return reclamationService.updateReclamation(reclamtion);
    }

    @DeleteMapping("/deleteReclamation/{reclamationId}")
    public void deleteReclamation(@PathVariable("reclamationId") String reclamationId) {
        reclamationService.deleteReclamation(reclamationId);
    }

    @GetMapping("/getAllReclamations")
    public List<Reclamtion> getAllReclamation() {
        return reclamationService.getAllReclamations();
    }

    @GetMapping("/getReclamationById/{reclamationId}")
    public Reclamtion getReclamationById(@PathVariable("reclamationId") String reclamationId) {
        return  reclamationService.getReclamationById(reclamationId);

    }
    @GetMapping("/searchByTitle")
    public List<Reclamtion> searchReclamationsByTitle(@RequestParam String title) {
        return reclamationService.searchReclamationsByTitle(title);
    }
    @GetMapping("/getAllReclamationsSortedByTitle")
    public List<Reclamtion> getAllReclamationsSortedByTitle() {
        return reclamationService.getAllReclamationsSortedByTitle();
    }

}




