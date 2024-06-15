package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.Pole;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IPoleService {
    public Pole addPole(Pole pole);
    public void deletePole(String codePole);
    public List<Pole> getAllPoles();
    Pole DetailsPole(String codePole);
    Pole updatePole(Pole pole,String id);
    Pole storeFile(MultipartFile file, String poleCode);

    Resource loadFileAsResource(String fileName);
    Pole affecterFaculteApole (Faculte f,String codep);





}
