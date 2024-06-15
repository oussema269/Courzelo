package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Domaine;
import com.example.courzeloproject.Repository.IDomaineRepo;
import com.example.courzeloproject.Service.IDomaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/Domaine")
public class DomaineController {
    @Autowired
    IDomaineService iDomaineService;
    @Autowired
   IDomaineRepo domaineRepository;
    @PostMapping("/addDomaine")
    public Domaine addDomaine(@RequestBody Domaine d){

        return iDomaineService.ajoutDomaine(d);
    }
    @GetMapping("/Domaines")

    public List<Domaine> Listededomaine()
    {
       return iDomaineService.listededomaine();
    }
    @DeleteMapping("/Domaine/{id}")

    public Domaine deleteDomaineById(@PathVariable("id")
                                       String id)
    {
       return iDomaineService.deleteDomaineById(id);
    }
    @CrossOrigin("*")
    @PutMapping("/Domaine/{id}")
    public Domaine updateDomaine(@RequestBody Domaine domaine,@PathVariable ("id") String id)
    {
        return iDomaineService.updateDomaine(domaine,id);
    }

    @GetMapping("dd/{id}")
    public Domaine getDomaineById(@PathVariable String id) {
        return domaineRepository.findById(id).orElse(null);
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<String> handleFileUpload(@RequestParam("photo") MultipartFile file, @PathVariable("id") String blogCode) {
        String fileName = iDomaineService.storeFile(file,blogCode);
        return ResponseEntity.ok().body(fileName);
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        Resource resource = iDomaineService.loadFileAsResource(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    }




