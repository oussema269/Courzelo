package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Interactions;
import com.example.courzeloproject.Entite.User;
import com.example.courzeloproject.Repository.BlogRepository;
import com.example.courzeloproject.Repository.InteractionsRepository;
import com.example.courzeloproject.Repository.UserRepo;
import com.example.courzeloproject.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service

public class BlogService implements IBlogService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired
    BlogRepository blogRepository;
    @Autowired
    UserRepo userRepository;

    @Autowired
    EmailSender iEmailService;
    @Autowired
    InteractionsRepository interactionsRepository;

    @Override
    public Blog addBlogWithInteractions(Blog blog) {

        Blog savedBlog = blogRepository.save(blog);
        savedBlog.setInteractions(blog.getInteractions());

        blogRepository.save(savedBlog);
        for (Interactions interaction : blog.getInteractions()) {
            interaction.setBlog(savedBlog);
            interactionsRepository.save(interaction);
        }

        return savedBlog;
    }


    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public List<Blog> getAllAprovedBlogs() {
        Boolean status = true;
        List<Blog> approvedBlog = blogRepository.findBlogByStatusIs(status);
        return approvedBlog;
    }

    @Override
    public List<Blog> getAllUnaprovedBlogs() {
        Boolean status = false;
        List<Blog> approvedBlog = blogRepository.findBlogByStatusIs(status);
        return approvedBlog;
    }

    @Override
    public Blog modifierBlog(Blog blog, String id) {
        Blog newblog = blogRepository.findBlogByBlogCode(id);
        newblog.setTitreBlog(blog.getTitreBlog());
        newblog.setDateBlog(LocalDate.now());
        newblog.setPhoto(blog.getPhoto());
        newblog.setDomaine(blog.getDomaine());
        return blogRepository.save(newblog);
    }

    @Override
    public void deleteBlog(String id) {

        blogRepository.deleteById(id);
    }

    @Override
    public Blog detailsBlog(String id) {
        return blogRepository.findBlogByBlogCode(id);
    }

    @Override
    public Blog addOnlyBlog(Blog blog) {
        Calendar cal = Calendar.getInstance();
        blog.setDateBlog(LocalDate.now());
        blog.setStatus(false);

        //sendAddedBlogEmail(user2);
        return blogRepository.save(blog);
    }

    @Override
    public Blog ApproveBlog(String id) {
        Blog blogToApprove = blogRepository.findBlogByBlogCode(id);

        blogToApprove.setStatus(true);
        //sendApprovedEmail(user);
        return blogRepository.save(blogToApprove);
    }

    @Override
    public List<Blog> ApproveAllBlogs() {
        List<Blog> blogsToApprove = blogRepository.findAll();

        for (Blog blog : blogsToApprove) {
            if (!blog.getStatus()) {
                blog.setStatus(true);
                blogRepository.save(blog);
                //sendApprovedEmail(user);
            }
        }

        return blogsToApprove;
    }


    @Override
    public Blog storeFile(MultipartFile file, String blogCode) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String newFileName = generateNewFileName(originalFileName);

        Path uploadPath = Paths.get(uploadDir);

        try {
            if (Files.notExists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath);

            Blog blog = blogRepository.findBlogByBlogCode(blogCode);
            blog.setPhoto(newFileName);
            return blogRepository.save(blog);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + newFileName, e);
        }
    }

    private String generateNewFileName(String originalFileName) {
        // You can customize this method to generate a unique file name.
        // For example, appending a timestamp or using a UUID.
        String timestamp = String.valueOf(System.currentTimeMillis());
        return timestamp + "_" + originalFileName;
    }


    @Override
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + fileName);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found: " + fileName, e);
        }
    }


    @Override
    public Blog addInteractionToBlog(String blogId, Interactions interaction) {
        Blog blog = blogRepository.findById(blogId).orElse(null);

        if (blog != null) {
            if (blog.getInteractions() == null) {
                blog.setInteractions(new ArrayList<>());

            }

            interaction.setBlog(blog);
            Interactions savedInteraction = interactionsRepository.save(interaction);
            blog.getInteractions().add(savedInteraction);
            blogRepository.save(blog);

            return blog;
        }

        return null;
    }

    public Interactions addReply(String parentInteractionId, Interactions reply) {
        Interactions parentInteraction = interactionsRepository.findById(parentInteractionId).orElse(null);

        if (parentInteraction != null) {
            if (parentInteraction.getReplay() == null) {
                parentInteraction.setReplay(new ArrayList<>());
            }

            reply.setParentInteraction(parentInteraction);
            Interactions savedReply = interactionsRepository.save(reply);
            parentInteraction.getReplay().add(savedReply);
            interactionsRepository.save(parentInteraction);

            return reply;
        }

        return null;
    }

    public void sendApprovedEmail(User user) {
        String toAddress = user.getEmail();
        String senderName = "EDULINK";
        String subject = "Blog Approvement";
        String content = "Hello, "
                + "This email sent to inform you that your blog has been approved. " ;


        MailDto mail = new MailDto(toAddress, senderName, subject, content);
        iEmailService.sendEmail(mail);
    }
    public void sendAddedBlogEmail(User user) {
        String toAddress = user.getEmail();
        String senderName = "EDULINK";
        String subject = "Blog Added";
        String content = "Hello, "
                + "This email sent to inform you that there is a new added blog to check ." ;


        MailDto mail = new MailDto(toAddress, senderName, subject, content);
        iEmailService.sendEmail(mail);
    }
}

