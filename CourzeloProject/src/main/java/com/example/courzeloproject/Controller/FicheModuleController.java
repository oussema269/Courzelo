package com.example.courzeloproject.Controller;

import com.example.courzeloproject.Entite.Chapitre;
import com.example.courzeloproject.Entite.Faculte;
import com.example.courzeloproject.Entite.FicheModuleCour;
import com.example.courzeloproject.Service.IChapitreService;
import com.example.courzeloproject.Service.IFicheModuleCourService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;

import static com.example.courzeloproject.Service.CourServiceImpl.*;
import static com.example.courzeloproject.Service.CourServiceImpl.addCustomRows;

@RequestMapping("FicheModuleCour")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FicheModuleController {
    @Autowired
    IFicheModuleCourService iFicheModuleCourService;
    @Autowired
    IChapitreService iChapitreService;
    @PostMapping("/ajouterFicheModule")
    public FicheModuleCour ajouterFicheModule(@RequestBody  FicheModuleCour ficheModuleCour) {
        return iFicheModuleCourService.ajouterFicheModule(ficheModuleCour);
    }
    @GetMapping("/getFicheCours")
    public List<FicheModuleCour> getFicheCours() {

        return iFicheModuleCourService.getFicheCours();
    }
        @PostMapping("/ajouterChapitre")

    public Chapitre ajouterChapitre(@RequestBody Chapitre chapitre) {
        return iChapitreService.ajouterChapitre(chapitre);
    }
    @GetMapping("/getChapitres")
    List<Chapitre> getChapitres(){
        return iChapitreService.getChapitres();
    }

    @PostMapping("/PdfGeneratorFicheModule")
    public void PdfGenerator(@RequestBody FicheModuleCour ficheModuleCour) throws DocumentException, IOException {
        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream("iTextImageExample.pdf"));
        document.open();

        // Titre
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.RED);
        Paragraph title = new Paragraph("Fiche Module", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Ajouter un espacement
        document.add(Chunk.NEWLINE);

        // Informations sur le module
        PdfPTable moduleTable = createModuleTable(ficheModuleCour);
        document.add(moduleTable);

        // Ajouter une section pour les chapitres
        addChapterSection(document, ficheModuleCour.getChapitreList());

        document.close();
    }

    private PdfPTable createModuleTable(FicheModuleCour ficheModuleCour) throws DocumentException {
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{1, 3});

        // Ajouter des cellules pour chaque attribut
        addCell(table, "Nom du Module", ficheModuleCour.getNomModule(), true, BaseColor.RED);
        addCell(table, "ECTS", String.valueOf(ficheModuleCour.getEcts()), true, BaseColor.GRAY.brighter());
        addCell(table, "Niveau", ficheModuleCour.getNiveau().toString(), true, BaseColor.GRAY.brighter());
        addCell(table, "Objectif", ficheModuleCour.getObjectif(), true, BaseColor.YELLOW);

        return table;
    }

    private void addChapterSection(Document document, List<Chapitre> chapitres) throws DocumentException {
        Font chapterFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.BLACK);

        for (Chapitre chapitre : chapitres) {
            // Titre du chapitre
            Paragraph chapterTitle = new Paragraph(chapitre.getNomChapitre(), chapterFont);
            chapterTitle.setAlignment(Element.ALIGN_CENTER);
            chapterTitle.setSpacingAfter(10f);
            document.add(chapterTitle);

            // Tableau pour afficher le détail du chapitre
            PdfPTable chapterTable = new PdfPTable(2);
            chapterTable.setWidthPercentage(100);
            chapterTable.setWidths(new float[]{2, 1});
            addCell(chapterTable, "Nom Chapitre", chapitre.getNomChapitre(), false, BaseColor.RED);
            addCell(chapterTable, "Durée", String.valueOf(chapitre.getDuree()), false, BaseColor.GRAY.brighter());

            document.add(chapterTable);

            document.add(Chunk.NEWLINE); // Espacement entre les chapitres
        }
    }

    private void addCell(PdfPTable table, String label, String value, boolean hasBorder, BaseColor bgColor) {
        PdfPCell cellLabel = new PdfPCell(new Phrase(label));
        cellLabel.setBackgroundColor(bgColor);
        PdfPCell cellValue = new PdfPCell(new Phrase(value));
        cellValue.setBackgroundColor(bgColor);
        if (hasBorder) {
            cellLabel.setBorderColor(BaseColor.GRAY);
            cellLabel.setBorderWidth(1f);
            cellValue.setBorderColor(BaseColor.GRAY);
            cellValue.setBorderWidth(1f);
        }
        table.addCell(cellLabel);
        table.addCell(cellValue);
    }
}


