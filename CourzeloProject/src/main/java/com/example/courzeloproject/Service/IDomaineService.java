package com.example.courzeloproject.Service;



import com.example.courzeloproject.Entite.Domaine;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import org.springframework.core.io.Resource;


public interface IDomaineService {
    public Domaine ajoutDomaine(Domaine d);
    List<Domaine> listededomaine ();
    public Domaine deleteDomaineById(String id);
    public Domaine updateDomaine(Domaine d,String id);
    String storeFile(MultipartFile file, String blogCode);

    Resource loadFileAsResource(String fileName);


}

