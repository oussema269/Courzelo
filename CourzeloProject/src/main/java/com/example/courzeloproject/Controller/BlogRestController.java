package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Service.IInteractionsService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import com.example.courzeloproject.Entite.Interactions;
import com.example.courzeloproject.Repository.BlogRepository;
import com.example.courzeloproject.Service.BlogService;
import com.example.courzeloproject.Service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/blog")
@CrossOrigin(origins = "http://localhost:4200")
public class BlogRestController {


    @Autowired
    private IBlogService iBlogService;
    @Autowired
    private IInteractionsService iInteractionsService;
    @PostMapping("/addBlogwithInter")
    public String AddBlogWithInteractions(@RequestBody Blog blog){
        iBlogService.addBlogWithInteractions(blog);

        return "Added Successfully";
    }
    @PostMapping("/addBlog")
    public Blog AddBlog(@RequestBody Blog blog){
        return iBlogService.addOnlyBlog(blog);
    }

    @GetMapping("/getAllUnapprovedBlogs")
    public List<Blog> showAllUnapprovedBlogs(){
        return iBlogService.getAllUnaprovedBlogs();
    } @GetMapping("/getAllBlogs")
    public List<Blog> showAllBlogs(){
        return iBlogService.getAllBlogs();
    }
    @GetMapping("/getAprovedBlogs")
    public List<Blog> showAllAprovedBlogs(){
        return iBlogService.getAllAprovedBlogs();
    }
    @PutMapping("/approveBlog/{id}")
    public Blog approveBlog(@PathVariable("id") String id){
        return iBlogService.ApproveBlog(id);
    }
    @PutMapping("/approveAll")
    public List<Blog> approveAllBlogs(){
        return iBlogService.ApproveAllBlogs();
    }
    @GetMapping("/getDetailsBlog/{id}")
    public Blog detailsBlog(@PathVariable("id") String id){
        return iBlogService.detailsBlog(id);
    }
    @PutMapping("/modifierBlog/{id}")
    public Blog modifierBlog(@RequestBody Blog blog, @PathVariable ("id") String id){
        return iBlogService.modifierBlog(blog,id);
    }
    @DeleteMapping("deleteBlog/{id}")
    public String deleteBlog(@PathVariable ("id") String id){
        iBlogService.deleteBlog(id);
        return "Blog Deleted";
    }
    //upload image
    @PostMapping("/upload/{id}")
    public Blog handleFileUpload(@RequestParam("photo") MultipartFile file,@PathVariable("id") String blogCode) {

        return iBlogService.storeFile(file,blogCode);
    }
    //affichage image
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileName") String fileName) {
        Resource resource = iBlogService.loadFileAsResource(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
    /*@PostMapping("/addinteraction/{id}")
    public ResponseEntity<Blog> addInteraction(@PathVariable("id") String blogCode,@RequestBody List<Interactions> interaction) {
        Blog updatedBlog =iBlogService.addComment(blogCode,interaction);
        return ResponseEntity.ok(updatedBlog);

    }*/

        @GetMapping("/getinteractions/{id}")
    public ResponseEntity<List<Interactions>> getComments(@PathVariable("id") String blogId) {
        List<Interactions> comments = iInteractionsService.getAllInteractions(blogId);
        return ResponseEntity.ok(comments);
    }   @GetMapping("/getReplies/{id}")
    public ResponseEntity<List<Interactions>> getReplies(@PathVariable("id") String commentId) {
        List<Interactions> comments = iInteractionsService.getReplies(commentId);
        return ResponseEntity.ok(comments);
    }
    @PostMapping("/addinteraction/{id}")
    public ResponseEntity<Blog> addInteraction(@PathVariable("id") String blogCode,@RequestBody Interactions interaction) {
        Blog updatedBlog = iBlogService.addInteractionToBlog(blogCode, interaction);
        return ResponseEntity.ok(updatedBlog);
    }
    @PostMapping("/addReponse/{id}")
    public ResponseEntity<Interactions> addReponse(@PathVariable("id") String commentId,@RequestBody Interactions reply) {
        Interactions updatedReplies = iBlogService.addReply(commentId, reply);
    return ResponseEntity.ok(updatedReplies);
    }


}

