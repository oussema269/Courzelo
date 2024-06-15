package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Class;
import com.example.courzeloproject.Service.IClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class")
@CrossOrigin(origins = "http://localhost:4200")
public class ClassController {
    @Autowired
    IClassService iClassService;

    @PostMapping("/addClass")
    public Class AddNewClass(@RequestBody Class newclass){
        return iClassService.addClass(newclass);
    }

    @GetMapping("/getAllClasses")
    public List<Class> showAllUnapprovedBlogs(){
        return iClassService.getAllClasses();
    }
    @GetMapping("/getClassById/{id}")
    public Class showOneClass(@PathVariable("id")String id){
        return iClassService.getClassById(id);
    }
}
