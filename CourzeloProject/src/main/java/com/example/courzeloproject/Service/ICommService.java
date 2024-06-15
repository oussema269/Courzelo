package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Commentaire;
import com.example.courzeloproject.Entite.Domaine;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICommService {
    public Commentaire ajoutCommentaire(Commentaire c);
    List<Commentaire> listedeCommentaire ();
    public Commentaire deleteCommentaireById(String id);
    public Commentaire updateCommentaire(Commentaire c,String id);
    public Commentaire repondre(String commentaireId, String reponse);

}
