import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { FaqSection, FaqItem } from '@/types/blog';

interface FaqSectionEditorProps {
  faqSections: FaqSection[];
  onChange: (faqSections: FaqSection[]) => void;
}

const FaqSectionEditor = ({ faqSections, onChange }: FaqSectionEditorProps) => {
  const [draggedSection, setDraggedSection] = useState<number | null>(null);
  const [draggedQuestion, setDraggedQuestion] = useState<{ sectionIndex: number; questionIndex: number } | null>(null);

  const addSection = () => {
    const newSection: FaqSection = {
      id: crypto.randomUUID(),
      title: '',
      questions: []
    };
    onChange([...faqSections, newSection]);
  };

  const removeSection = (sectionIndex: number) => {
    const newSections = faqSections.filter((_, i) => i !== sectionIndex);
    onChange(newSections);
  };

  const updateSectionTitle = (sectionIndex: number, title: string) => {
    const newSections = faqSections.map((section, i) => 
      i === sectionIndex ? { ...section, title } : section
    );
    onChange(newSections);
  };

  const addQuestion = (sectionIndex: number) => {
    const newSections = faqSections.map((section, i) => 
      i === sectionIndex 
        ? { ...section, questions: [...section.questions, { question: '', answer: '' }] }
        : section
    );
    onChange(newSections);
  };

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const newSections = faqSections.map((section, i) => 
      i === sectionIndex 
        ? { ...section, questions: section.questions.filter((_, j) => j !== questionIndex) }
        : section
    );
    onChange(newSections);
  };

  const updateQuestion = (sectionIndex: number, questionIndex: number, field: 'question' | 'answer', value: string) => {
    const newSections = faqSections.map((section, i) => 
      i === sectionIndex 
        ? {
            ...section,
            questions: section.questions.map((item, j) => 
              j === questionIndex ? { ...item, [field]: value } : item
            )
          }
        : section
    );
    onChange(newSections);
  };

  // Section drag & drop
  const handleSectionDragStart = (e: React.DragEvent, sectionIndex: number) => {
    setDraggedSection(sectionIndex);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSectionDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedSection === null || draggedSection === dropIndex) {
      setDraggedSection(null);
      return;
    }

    const newSections = [...faqSections];
    const draggedSectionData = newSections[draggedSection];
    
    newSections.splice(draggedSection, 1);
    const adjustedDropIndex = draggedSection < dropIndex ? dropIndex - 1 : dropIndex;
    newSections.splice(adjustedDropIndex, 0, draggedSectionData);
    
    onChange(newSections);
    setDraggedSection(null);
  };

  // Question drag & drop
  const handleQuestionDragStart = (e: React.DragEvent, sectionIndex: number, questionIndex: number) => {
    setDraggedQuestion({ sectionIndex, questionIndex });
    e.dataTransfer.effectAllowed = 'move';
    e.stopPropagation();
  };

  const handleQuestionDrop = (e: React.DragEvent, sectionIndex: number, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedQuestion || 
        (draggedQuestion.sectionIndex === sectionIndex && draggedQuestion.questionIndex === dropIndex)) {
      setDraggedQuestion(null);
      return;
    }

    const newSections = [...faqSections];
    const sourceSection = newSections[draggedQuestion.sectionIndex];
    const targetSection = newSections[sectionIndex];
    
    const draggedQuestionData = sourceSection.questions[draggedQuestion.questionIndex];
    
    // Remove from source
    sourceSection.questions.splice(draggedQuestion.questionIndex, 1);
    
    // Add to target
    const adjustedDropIndex = draggedQuestion.sectionIndex === sectionIndex && draggedQuestion.questionIndex < dropIndex 
      ? dropIndex - 1 
      : dropIndex;
    targetSection.questions.splice(adjustedDropIndex, 0, draggedQuestionData);
    
    onChange(newSections);
    setDraggedQuestion(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">FAQ Sections</h3>
        <Button
          type="button"
          onClick={addSection}
          className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une section
        </Button>
      </div>

      {faqSections.length === 0 ? (
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="pt-6">
            <p className="text-gray-300 text-center">
              Aucune section FAQ ajoutée. Cliquez sur "Ajouter une section" pour commencer.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {faqSections.map((section, sectionIndex) => (
            <Card 
              key={section.id} 
              className="bg-gray-800 border-gray-600"
              draggable
              onDragStart={(e) => handleSectionDragStart(e, sectionIndex)}
              onDragOver={handleSectionDragOver}
              onDrop={(e) => handleSectionDrop(e, sectionIndex)}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <GripVertical className="w-4 h-4 text-gray-400 mr-2 cursor-move" />
                    <span>Section {sectionIndex + 1}</span>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSection(sectionIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Section title */}
                <div className="space-y-2">
                  <Label htmlFor={`section-title-${sectionIndex}`} className="text-white">
                    Titre de la section *
                  </Label>
                  <Input
                    id={`section-title-${sectionIndex}`}
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                    placeholder="Ex: Questions techniques, Tarification, Support..."
                    className="bg-gray-900 border-gray-600 text-white"
                    required
                  />
                </div>

                {/* Questions in this section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-white">Questions</h4>
                    <Button
                      type="button"
                      onClick={() => addQuestion(sectionIndex)}
                      size="sm"
                      className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une question
                    </Button>
                  </div>

                  {section.questions.length === 0 ? (
                    <div className="text-gray-400 text-sm text-center py-4 border border-gray-600 border-dashed rounded">
                      Aucune question dans cette section
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {section.questions.map((question, questionIndex) => (
                        <Card 
                          key={questionIndex}
                          className="bg-gray-700 border-gray-600"
                          draggable
                          onDragStart={(e) => handleQuestionDragStart(e, sectionIndex, questionIndex)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onDrop={(e) => handleQuestionDrop(e, sectionIndex, questionIndex)}
                        >
                          <CardHeader className="pb-3">
                            <CardTitle className="text-white text-sm flex items-center justify-between">
                              <div className="flex items-center">
                                <GripVertical className="w-3 h-3 text-gray-400 mr-2 cursor-move" />
                                <span>Question {questionIndex + 1}</span>
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeQuestion(sectionIndex, questionIndex)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor={`question-${sectionIndex}-${questionIndex}`} className="text-white text-sm">
                                Question *
                              </Label>
                              <Input
                                id={`question-${sectionIndex}-${questionIndex}`}
                                value={question.question}
                                onChange={(e) => updateQuestion(sectionIndex, questionIndex, 'question', e.target.value)}
                                placeholder="Tapez votre question ici..."
                                className="bg-gray-800 border-gray-600 text-white"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`answer-${sectionIndex}-${questionIndex}`} className="text-white text-sm">
                                Réponse *
                              </Label>
                              <Textarea
                                id={`answer-${sectionIndex}-${questionIndex}`}
                                value={question.answer}
                                onChange={(e) => updateQuestion(sectionIndex, questionIndex, 'answer', e.target.value)}
                                placeholder="Tapez votre réponse ici... Utilisez **texte** pour le gras, *texte* pour l'italique, [lien](url) pour les liens"
                                rows={3}
                                className="bg-gray-800 border-gray-600 text-white"
                                required
                              />
                              <div className="text-xs text-gray-400">
                                Formatage supporté : **gras**, *italique*, [lien](url)
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqSectionEditor;