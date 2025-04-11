package org.projectmanagement.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.bouncycastle.util.Times;

import java.io.Serial;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "user_id")
    private String  user_id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password_hash")
    private String password_hash;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "role_id")
    private Integer role_id;

    @Column(name = "is_scrum_master")
    private Boolean is_scrum_master;

    @Column(name = "is_product_owner")
    private Boolean is_product_owner;

    @Column(name = "last_login")
    private Timestamp last_login;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", insertable = false)
    private Timestamp created_at;

    @PrePersist
    protected void onCreate() {
        this.created_at = new Timestamp(System.currentTimeMillis());
    }

    @Column(name = "updated_at")
    private Timestamp updated_at;


}
