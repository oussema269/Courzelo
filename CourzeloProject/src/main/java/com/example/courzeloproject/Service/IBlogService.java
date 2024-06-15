package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Interactions;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IBlogService {
    Blog addBlogWithInteractions(Blog blog);
    List<Blog> getAllBlogs();
    List<Blog> getAllAprovedBlogs();
    List<Blog> getAllUnaprovedBlogs();
    Blog modifierBlog(Blog blog, String id);
    void deleteBlog(String id);
    Blog detailsBlog(String id);
    Blog addOnlyBlog(Blog blog);
    Blog ApproveBlog(String id );
    List<Blog> ApproveAllBlogs();
    Blog storeFile(MultipartFile file, String blogCode);

    Resource loadFileAsResource(String fileName);

    //Blog addComment(String blogId, List<Interactions> comment);
    Blog addInteractionToBlog(String blogId, Interactions comment);
    Interactions addReply(String commentId, Interactions replay);
}
