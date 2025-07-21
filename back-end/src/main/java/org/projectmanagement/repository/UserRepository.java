package org.projectmanagement.repository;

import org.projectmanagement.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    @Query("SELECT s FROM User s WHERE s.username = :username")
    User findUserByUsername(String username);

    @Query("SELECT s.user_id FROM User s WHERE s.username = :username")
    String findId(String username);


}
