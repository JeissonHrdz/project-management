package org.projectmanagement.service.impl;

import org.projectmanagement.model.dto.backlog.BacklogCreateEpicDto;
import org.projectmanagement.model.dto.backlog.BacklogReadItemDto;
import org.projectmanagement.model.dto.backlog.BacklogResponseDto;
import org.projectmanagement.service.BacklogService;

import java.util.List;
import java.util.Map;

public class BacklogServiceImpl  implements BacklogService {
    @Override
    public BacklogResponseDto createEpic(BacklogCreateEpicDto backlogCreateEpicDto) {
        return null;
    }

    @Override
    public BacklogResponseDto updateEpic(int id, Map<String, Object> updates) {
        return null;
    }

    @Override
    public List<BacklogReadItemDto> getItemsByProjectId(Integer project_id, String type) {
        return List.of();
    }

    @Override
    public void deleteEpic(Integer item_id) {

    }
}
