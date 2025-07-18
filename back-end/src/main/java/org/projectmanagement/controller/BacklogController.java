package org.projectmanagement.controller;

import lombok.AllArgsConstructor;
import org.projectmanagement.model.dto.backlog.BacklogCreateEpicDto;
import org.projectmanagement.model.dto.backlog.BacklogCreateHistoryDto;
import org.projectmanagement.model.dto.backlog.BacklogReadItemDto;
import org.projectmanagement.model.dto.backlog.BacklogResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.BacklogService;
import org.projectmanagement.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("project/{project_id}/backlog")
@AllArgsConstructor
public class BacklogController {

    private final BacklogService backlogService;
    private final RoleService roleService;

    @PostMapping("create-epic")
    public ResponseEntity<?> createEpic(@RequestBody BacklogCreateEpicDto backlogCreateEpicDto) {
        if(!roleService.hasPermission("backlog", "create")) {
              throw new AccessDeniedException("Access Denied");
        }
        try{
            BacklogResponseDto backlogResponseDto = backlogService.createEpic(backlogCreateEpicDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Epic created successfully")
                    .object(backlogResponseDto)
                    .build(), HttpStatus.CREATED);

        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);

        }
    }

    @PostMapping("create-story")
    public ResponseEntity<?> createHistory(@RequestBody BacklogCreateHistoryDto backlogCreateHistoryDto) {
        if(!roleService.hasPermission("backlog", "create")) {
            throw new AccessDeniedException("Access Denied");
        }
        try{
            BacklogResponseDto backlogResponseDto = backlogService.createStory(backlogCreateHistoryDto) ;
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Epic created successfully")
                    .object(backlogResponseDto)
                    .build(), HttpStatus.CREATED);

        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("items/{type}")
    public ResponseEntity<?> getBacklogItems(@PathVariable int project_id, @PathVariable String type) {
        if(!roleService.hasPermission("backlog", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
           List<BacklogReadItemDto> backlogReadItemDto = backlogService.getItemsByProjectId(project_id, type);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Backlog items fetched successfully")
                    .object(backlogReadItemDto)
                    .build(), HttpStatus.OK);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

    
    @GetMapping("item/{id}")
    public ResponseEntity<?> getBacklogItemById(@PathVariable int id) {
        if(!roleService.hasPermission("backlog", "read")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
        BacklogReadItemDto backlogReadItemDto = backlogService.getItemById(id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Backlog items fetched successfully")
                    .object(backlogReadItemDto)
                    .build(), HttpStatus.OK);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

  


    @PatchMapping("update/{id}")
    public ResponseEntity<?> updateBacklogItem(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        if(!roleService.hasPermission("backlog", "update")) {
            throw new AccessDeniedException("Access Denied");
        }
        try{
            BacklogResponseDto backlogResponseDto = backlogService.updateItem(id, updates);
            System.err.println("EPIC:" +backlogResponseDto.epic_id());
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Backlog item updated successfully")
                    .object(backlogResponseDto)
                    .build(), HttpStatus.OK);

        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteBacklogItem(@PathVariable int id) {
        if(!roleService.hasPermission("backlog", "delete")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
            if(backlogService.deleteItemByEpicId(id) > 0) {
                backlogService.deleteItem(id);
                return new ResponseEntity<>(ResponseMessage.builder()
                        .message("Backlog item deleted successfully")
                        .build(), HttpStatus.OK);
            }  else {
                return new ResponseEntity<>(ResponseMessage.builder()
                        .message("Backlog item not deleted")
                        .build(), HttpStatus.CONFLICT);
            }

        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("delete-story/{id}")
    public ResponseEntity<?> deleteBacklogStory(@PathVariable int id) {
        if(!roleService.hasPermission("backlog", "delete")) {
            throw new AccessDeniedException("Access Denied");
        }
        try {
                backlogService.deleteItem(id);
                return new ResponseEntity<>(ResponseMessage.builder()
                        .message("Backlog item deleted successfully")
                        .build(), HttpStatus.OK);


        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(), HttpStatus.BAD_REQUEST);
        }
    }


}
