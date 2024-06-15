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
@RequestMapping("Pole")
@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class PoleController {
    @Autowired
    IPoleService iPoleService;
    @Autowired
    IFaculteService iFaculteService;
    @PostMapping("/addPole")
    public Pole AddPole(@RequestBody Pole pole) {
        return iPoleService.addPole(pole);
    }
    @GetMapping("/getAllPoles")
    public List<Pole> getAllPoles(){
        return iPoleService.getAllPoles();
    }
    @GetMapping("/getDetailsPole/{id}")
    public Pole detailsPole(@PathVariable("id") String id){
        return iPoleService.DetailsPole(id);
    }
    @DeleteMapping("/deletePole/{id}")
    public String deletePole(@PathVariable ("id") String id){
        iPoleService.deletePole(id);
        return "Pole Deleted";
    }
    @PutMapping("/modifierPole/{id}")
    public Pole modifierPole(@RequestBody Pole pole, @PathVariable ("id") String id){
        return iPoleService.updatePole(pole,id);
    }
    @PostMapping("/uploadpole/{id}")
    public Pole handleFileUpload(@RequestParam("photo") MultipartFile file, @PathVariable("id") String poleCode) {
        return iPoleService.storeFile(file,poleCode);

    }

    @GetMapping("/downloadpole/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileName") String fileName) {
        Resource resource = iPoleService.loadFileAsResource(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

    }
    @PostMapping("/affecterFaculteApole/{codep}")
    Pole affecterFaculteApole(@RequestBody Faculte fac,@PathVariable("codep") String codep){
        return iPoleService.affecterFaculteApole(fac,codep);
    }

}
