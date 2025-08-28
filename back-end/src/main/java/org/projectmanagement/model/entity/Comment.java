package org.projectmanagement.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer comment_id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;

    @Column(name = "content")
    private String content;

    @Column(name = "is_edited")
    private boolean is_edited;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", insertable = false)
    private Timestamp created_at;

    @Column(name = "updated_at")
    private Timestamp updated_at;
}
