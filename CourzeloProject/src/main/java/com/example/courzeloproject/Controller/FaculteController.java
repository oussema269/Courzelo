package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.Pole;
import com.example.courzeloproject.Service.IFaculteService;
import com.example.courzeloproject.Service.IPoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RequestMapping("Faculte")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FaculteController {
    @Autowired
    IFaculteService iFaculteService;
    @Autowired
    IPoleService iPoleService;
    @PostMapping("/addFaculte")
    public Faculte AddFaculte(@RequestBody Faculte faculte) {
       return iFaculteService.addFaculte(faculte);
    }
    @PostMapping("/addFaculteToPole/{codep}")
    public Faculte addFaculteToPole(@RequestBody Faculte faculte, @PathVariable("codep") String codep) {
        return iFaculteService.addFaculteToPole(codep,faculte);
    }
    @GetMapping("/getAllFacultes")
    public List<Faculte> getAllFacultes(){
        return iFaculteService.getAllFacultes();
    }
    @GetMapping("/getDetailsFaculte/{id}")
    public Faculte detailsFaculte(@PathVariable("id") String id){
        return iFaculteService.DetailsFaculte(id);
    }
    @DeleteMapping("/deleteFaculte/{id}")
    public String deleteFaculte(@PathVariable ("id") String id){
        iFaculteService.deleteFaculte(id);
        return "Faculte Deleted";
    }
    @PutMapping("/modifierFaculte/{id}")
    public Faculte modifierFaculte(@RequestBody Faculte faculte, @PathVariable ("id") String id){
        return iFaculteService.updatefaculte(faculte,id);
    }

    @PostMapping("/uploadfaculte/{id}")
    public Faculte handleFileUpload(@RequestParam("photo") MultipartFile file, @PathVariable("id") String faculteCode) {
        return iFaculteService.storeFile(file,faculteCode);

    }

    @GetMapping("/downloadfaculte/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileName") String fileName) {
        Resource resource = iFaculteService.loadFileAsResource(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

    }
    @GetMapping("/getFaculteByPoleId/{codep}")
    public List<Faculte> getFaculteByPoleId(@PathVariable("codep") String code){
        return iFaculteService.getFaculteByPoleId(code);
    }

    //youssef
    @GetMapping("/getfaculteByNom/{nom}")
    public Faculte getfaculteByNom(@PathVariable("nom") String nom){
        return iFaculteService.getFaculteByName(nom);
    }

}
