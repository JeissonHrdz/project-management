package org.projectmanagement.service;

import org.projectmanagement.model.dto.backlog.BacklogCreateEpicDto;
import org.projectmanagement.model.dto.backlog.BacklogCreateHistoryDto;
import org.projectmanagement.model.dto.backlog.BacklogReadItemDto;
import org.projectmanagement.model.dto.backlog.BacklogResponseDto;

import java.util.List;
import java.util.Map;

public interface BacklogService {

    BacklogResponseDto createEpic(BacklogCreateEpicDto backlogCreateEpicDto);
    BacklogResponseDto createStory(BacklogCreateHistoryDto backlogCreateHistoryDto);
    BacklogResponseDto updateItem(int id, Map<String, Object> updates);
    List<BacklogReadItemDto> getItemsByProjectId(Integer project_id, String type);
    BacklogReadItemDto getItemById(Integer id);
    void deleteItem(Integer item_id);
    int deleteItemByEpicId(Integer epic_id);
}
