package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Commentaire;

import com.example.courzeloproject.Repository.ICommRepo;
import com.example.courzeloproject.Service.ICommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Date;

@CrossOrigin("*")
@RestController
@RequestMapping("/Commentaire")
public class CommentaireController {
    @Autowired
    ICommService iCommService;
    @Autowired
    ICommRepo iCommRepo;
    @PostMapping("/addCommentaire")
    public Commentaire addCommentaire(@RequestBody Commentaire c){
        c.setDateComm(new Date());

        return iCommService.ajoutCommentaire(c);
    }
    @GetMapping("/Commentaires")

    public List<Commentaire> ListedeCommentaire()
    {
        return iCommService.listedeCommentaire();
    }
    @DeleteMapping("/Commentaire/{id}")

    public Commentaire deleteCommentaireById(@PathVariable("id")
                                     String id)
    {
        return iCommService.deleteCommentaireById(id);
    }
    @CrossOrigin("*")
    @PutMapping("/Commentaire/{id}")
    public Commentaire updateCommentaire(@RequestBody Commentaire commentaire,@PathVariable ("id") String id)
    {
        return iCommService.updateCommentaire(commentaire,id);
    }

    @GetMapping("cc/{id}")
    public Commentaire getCommentaireById(@PathVariable String id) {
        return iCommRepo.findById(id).orElse(null);

    }
    @CrossOrigin("*")
    @PostMapping("/{commentaireId}/reponse")
    public Commentaire repondreCommentaire(@PathVariable String commentaireId, @RequestBody String reponse) {
        return iCommService.repondre(commentaireId, reponse);
    }


}
