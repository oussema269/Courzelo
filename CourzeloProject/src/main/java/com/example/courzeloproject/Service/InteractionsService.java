package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Blog;
import com.example.courzeloproject.Entite.Interactions;
import com.example.courzeloproject.Repository.BlogRepository;
import com.example.courzeloproject.Repository.InteractionsRepository;
import com.example.courzeloproject.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class InteractionsService implements IInteractionsService{
    @Autowired
    InteractionsRepository interactionsRepository;
    @Autowired
    BlogRepository blogRepository;
    @Autowired
    UserRepo userRepo;
    @Override
    public Interactions addInteraction(Interactions interactions) {
        return interactionsRepository.save(interactions);
    }

    @Override
    public void deleteInteraction(String id) {
        Optional<Interactions> optionalInteraction = interactionsRepository.findById(id);

        if (optionalInteraction.isPresent()) {
            Interactions interaction = optionalInteraction.get();
            Blog associatedBlog = interaction.getBlog();
            associatedBlog.getInteractions().remove(interaction);
            blogRepository.save(associatedBlog);
            interactionsRepository.deleteById(id);
        }
    }
    public List<Interactions> getAllInteractions(String idBlog) {

        return interactionsRepository.findInteractionsByBlogBlogCode(idBlog);
    }
    public List<Interactions> getReplies(String interactionId) {

        Optional<Interactions> interaction = interactionsRepository.findById(interactionId);

        if (interaction.isPresent()) {
            return interaction.get().getReplay();  // Assuming getReplay() returns the list of replies
        } else {
            return Collections.emptyList();
        }
    }

}
