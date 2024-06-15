package com.example.courzeloproject.Service;

import com.example.courzeloproject.Entite.Interactions;

import java.util.List;

public interface IInteractionsService {
    Interactions addInteraction(Interactions interactions);
    void deleteInteraction(String id);
    List<Interactions> getAllInteractions(String id);
    List<Interactions> getReplies(String interactionId);
}
