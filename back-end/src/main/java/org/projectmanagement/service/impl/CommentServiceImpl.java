package org.projectmanagement.service.impl;

import lombok.RequiredArgsConstructor;
import org.projectmanagement.model.dto.comment.CommentCreateDto;
import org.projectmanagement.model.dto.comment.CommentReadDto;
import org.projectmanagement.model.dto.comment.CommentResponseDto;
import org.projectmanagement.model.entity.Comment;
import org.projectmanagement.repository.CommentRepository;
import org.projectmanagement.repository.TaskRepository;
import org.projectmanagement.repository.UserRepository;
import org.projectmanagement.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl  implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public CommentResponseDto createComment(CommentCreateDto commentCreateDto) {
         Comment comment = Comment.builder()
         .content(commentCreateDto.content())
         .task_id(taskRepository.findById(commentCreateDto.task_id()).orElseThrow(() -> new RuntimeException("Task not found")))
         .user_id(userRepository.findById(commentCreateDto.user_id()).orElseThrow(() -> new RuntimeException("User not found")))
                 .build();
         Comment savedComment = commentRepository.save(comment);
         Comment commentResponse =  commentRepository.getCommentById( savedComment.getComment_id());

        return new CommentResponseDto(
                commentResponse.getComment_id(),
                commentResponse.getContent(), 
                commentResponse.getTask_id().getTask_id(),
                commentResponse.getUser_id().getUser_id(),
                commentResponse.is_edited(),
                commentResponse.getCreated_at(),
                commentResponse.getUpdated_at()
        );



    }

    @Override
    public List<CommentReadDto> getAllCommentsByTask(Integer task_id) {
        List<Comment> comments = commentRepository.findAllByTask_id(task_id);
        if(comments.isEmpty()) {
            return List.of();
        }

        List<CommentReadDto> commentReadDtos = comments.stream()
                .map( comment -> new CommentReadDto(
                comment.getComment_id(),
                comment.getTask_id().getTask_id(),
                comment.getUser_id().getUser_id(),
                        comment.getContent(),
                comment.is_edited(),
                comment.getCreated_at(),
                comment.getUpdated_at()
        )).collect(Collectors.toList());

        return commentReadDtos;
    }

    @Override
    public CommentReadDto getCommentById(Integer comment_id) {
        return null;
    }

    @Override
    public CommentReadDto getCommentByUserId(String user_id) {
        return null;
    }

    @Override
    public void deleteComment(Integer comment_id) {

    }
}
