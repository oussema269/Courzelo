package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Commentaire;

import com.example.courzeloproject.Repository.ICommRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CommServiceImpl implements ICommService{
    @Autowired
    ICommRepo iCommRepo;
    @Override
    public Commentaire ajoutCommentaire(Commentaire c) {
        return iCommRepo.save(c);
    }

    @Override
    public List<Commentaire> listedeCommentaire() {
        return iCommRepo.findAll();
    }

    @Override
    public Commentaire deleteCommentaireById(String id) {
        iCommRepo.deleteById(id);
        return null ;
    }

    @Override
    public Commentaire updateCommentaire(Commentaire c, String id) {

        Commentaire commentaire ;
        commentaire=iCommRepo.findById(id).get();
        commentaire.setCorp(c.getCorp());
        commentaire.setDateComm(c.getDateComm());
        commentaire.setEmail(c.getEmail());
        commentaire.setFullname(c.getFullname());
        commentaire.setSubject(c.getSubject());





        return iCommRepo.save(commentaire);
    }
    @Override
    public Commentaire repondre(String commentaireId, String reponse) {
        Commentaire commentaire = iCommRepo.findById(commentaireId)
                .orElseThrow(() -> new RuntimeException("Commentaire non trouvé avec l'ID : " + commentaireId));

        commentaire.setReponse(reponse);
        return iCommRepo.save(commentaire);
    }
}
