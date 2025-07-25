package org.projectmanagement.repository;

import org.projectmanagement.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByUsername(String username);

    @Query("SELECT s FROM User s WHERE s.username = :username")
    User findUserByUsername(String username);

    @Query("SELECT s.user_id FROM User s WHERE s.username = :username")
    String findId(String username);

    @Query("SELECT s.email FROM User s WHERE s.email LIKE %:email%")
    List<String> findEmail(String email);

    @Query("SELECT s.user_id FROM User s WHERE s.email = :email")
    String  findIdUserByEmail(String email);


}
