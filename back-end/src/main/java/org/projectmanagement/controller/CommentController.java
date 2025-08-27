package org.projectmanagement.controller;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.comment.CommentCreateDto;
import org.projectmanagement.model.dto.comment.CommentReadDto;
import org.projectmanagement.model.dto.comment.CommentResponseDto;
import org.projectmanagement.model.payload.ResponseMessage;
import org.projectmanagement.service.CommentService;
import org.projectmanagement.service.RoleService;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = {"http://localhost:4500"})
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final RoleService roleService;

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CommentCreateDto commentCreateDto) {

        if(!roleService.hasPermission( "comments","create")){
             throw new AccessDeniedException("Access Denied");
        }
        try{
            CommentResponseDto createComment = commentService.createComment(commentCreateDto);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Comment created successfully")
                    .object(createComment)
                    .build(), HttpStatus.CREATED);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }


    }

    @GetMapping( value = "/comment-task/{task_id}")
    public ResponseEntity<?> getCommentsByTaskId(@PathVariable Integer task_id) {
        System.err.println(task_id);
        if(!roleService.hasPermission( "comments","read")){
             throw new AccessDeniedException("Access Denied");
        }
        try{
            List<CommentReadDto> getCommentsByTaskId = commentService.getAllCommentsByTask(task_id);
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message("Comments retrieved successfully")
                    .object(getCommentsByTaskId)
                    .build(), HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(ResponseMessage.builder()
                    .message(e.getMessage())
                    .build(),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
