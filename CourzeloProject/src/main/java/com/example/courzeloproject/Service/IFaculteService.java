package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.User;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IFaculteService {
    public Faculte addFaculte(Faculte faculte);
    public void deleteFaculte(String id);
    public List<Faculte> getAllFacultes();
    Faculte DetailsFaculte(String codeFaculte);
    Faculte updatefaculte(Faculte faculte,String id);
    Faculte storeFile(MultipartFile file, String faculteCode);

    Resource loadFileAsResource(String fileName);
    List<Faculte> getFaculteByPoleId(String codep);
    Faculte addFaculteToPole(String polec, Faculte faculte) ;
    public void sendAddedFaculteEmail(User user);

    //youssef
    Faculte getFaculteByName (String nomF);

}
