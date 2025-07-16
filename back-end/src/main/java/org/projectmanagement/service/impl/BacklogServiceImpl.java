package org.projectmanagement.service.impl;

import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.backlog.BacklogCreateEpicDto;
import org.projectmanagement.model.dto.backlog.BacklogCreateHistoryDto;
import org.projectmanagement.model.dto.backlog.BacklogReadItemDto;
import org.projectmanagement.model.dto.backlog.BacklogResponseDto;
import org.projectmanagement.model.entity.Backlog;
import org.projectmanagement.model.entity.Task;
import org.projectmanagement.model.mapper.BacklogMapper;
import org.projectmanagement.repository.BacklogRepository;
import org.projectmanagement.repository.ProjectRepository;
import org.projectmanagement.service.BacklogService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BacklogServiceImpl  implements BacklogService {

    private final BacklogRepository backlogRepository;
    private final ProjectRepository projectRepository;
    private final BacklogMapper backlogMapper;

    @Override
    public BacklogResponseDto createEpic(BacklogCreateEpicDto backlogCreateEpicDto) {
        Backlog backlog = Backlog.builder()
                .title(backlogCreateEpicDto.title())
                .description(backlogCreateEpicDto.description())
                .acceptance_criteria(backlogCreateEpicDto.acceptance_criteria())
                .priority(backlogCreateEpicDto.priority())
                .type(backlogCreateEpicDto.type())
                .project_id(projectRepository.findById(backlogCreateEpicDto.project_id()).get())
                .build();
        backlogRepository.save(backlog);
        return new BacklogResponseDto(
                backlog.getItem_id(),
                backlog.getTitle(),
                backlog.getDescription(),
                backlog.getAcceptance_criteria(),
                backlog.getPriority(),
                backlog.getStory_points(),
                backlog.getType(),
                backlog.getProject_id().getProject_id(),
                0
        );
    }

    @Override
    public BacklogResponseDto createStory(BacklogCreateHistoryDto backlogCreateHistoryDto) {
        Backlog backlog = Backlog.builder()
                .title(backlogCreateHistoryDto.title())
                .description(backlogCreateHistoryDto.description())
                .acceptance_criteria(backlogCreateHistoryDto.acceptance_criteria())
                .priority(backlogCreateHistoryDto.priority())
                .story_points(backlogCreateHistoryDto.story_points())
                .type(backlogCreateHistoryDto.type())
                .project_id(projectRepository.findById(backlogCreateHistoryDto.project_id()).get())
                .epic(backlogRepository.findById(backlogCreateHistoryDto.epic_id()).get())
                .build();
        backlogRepository.save(backlog);
        return new BacklogResponseDto(
                backlog.getItem_id(),
                backlog.getTitle(),
                backlog.getDescription(),
                backlog.getAcceptance_criteria(),
                backlog.getPriority(),
                backlog.getStory_points(),
                backlog.getType(),
                backlog.getProject_id().getProject_id(),
                backlog.getEpic().getItem_id()
        );
    }

    @Override
    public BacklogResponseDto updateItem(int id, Map<String, Object> updates) {
        Optional<Backlog> backlog = backlogRepository.findById(id);
        updates.forEach((key, value) -> {
            switch (key) {
                case "title" -> backlog.get().setTitle((String) value);
                case "description" -> backlog.get().setDescription((String) value);
                case "acceptance_criteria" -> backlog.get().setAcceptance_criteria((String) value);
                case "priority" -> backlog.get().setPriority((Integer) value);
                case "story_points" -> backlog.get().setStory_points((Integer) value);
                case "type" -> backlog.get().setType((String) value);
                case "epic_id" -> {
                    Integer epicId = convertToInteger(value);
                    backlog.get().setEpic(backlogRepository.findById(epicId)
                            .orElseThrow(() -> new IllegalArgumentException("Epic not found with id: " + epicId)));
                }


                default -> throw new IllegalArgumentException("Invalid key: " + key);
            }
        });

        System.err.println(backlogMapper.toDto(backlogRepository.save(backlog.get())).epic_id());
         return backlogMapper.toDto(backlogRepository.save(backlog.get()));

    }

    private Integer convertToInteger(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Integer) {
            return (Integer) value;
        }
        if (value instanceof String) {
            try {
                return Integer.parseInt((String) value);
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Cannot convert '" + value + "' to Integer");
            }
        }
        throw new IllegalArgumentException("Unsupported type for Integer conversion: " + value.getClass());
    }

    @Override
    public List<BacklogReadItemDto> getItemsByProjectId(Integer project_id, String type) {
        List<Backlog> backlogs = backlogRepository.getItemsByProjectId(project_id, type);
        if (backlogs.isEmpty()) {
            return List.of();
        }
        if(type.equals("EPIC")) {
            List<BacklogReadItemDto> backlogReadItemDtos = backlogs.stream().map(item -> new BacklogReadItemDto(
                    item.getItem_id(),
                    item.getTitle(),
                    item.getDescription(),
                    item.getAcceptance_criteria(),
                    item.getPriority(),
                    item.getStory_points(),
                   0,
                    item.getType(),
                    item.getProject_id().getProject_id(),
                    item.getCreated_at()
            )).toList();
            return backlogReadItemDtos;
        } else {
            List<BacklogReadItemDto> backlogReadItemDtos = backlogs.stream().map(item -> new BacklogReadItemDto(
                    item.getItem_id(),
                    item.getTitle(),
                    item.getDescription(),
                    item.getAcceptance_criteria(),
                    item.getPriority(),
                    item.getStory_points(),
                    item.getEpic().getItem_id(),
                    item.getType(),
                    item.getProject_id().getProject_id(),
                    item.getCreated_at()
            )).toList();
            return backlogReadItemDtos;
        }
    }

    @Override
    public BacklogReadItemDto getItemById(Integer id){
    Optional<Backlog> backlog = backlogRepository.findById(id);
        if(backlog.isEmpty()) return null;

        return new BacklogReadItemDto(
            backlog.get().getItem_id(),
            backlog.get().getTitle(),
            backlog.get().getDescription(),
            backlog.get().getAcceptance_criteria(),
            backlog.get().getPriority(),
            backlog.get().getStory_points(),
            backlog.get().getEpic().getItem_id(),
            backlog.get().getType(),
            backlog.get().getProject_id().getProject_id(),
            backlog.get().getCreated_at()
        );
    }

    @Override
    public void deleteItem(Integer item_id) {
        backlogRepository.deleteById(item_id);
    }

    @Override
    public int deleteItemByEpicId(Integer epic_id) {
        System.out.println("deleteItemByEpicId: " + epic_id);
       return backlogRepository.deleteByEpicId(epic_id);
    }
}
