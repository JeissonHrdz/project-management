package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Backlog;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Integer> {

    @Query("SELECT b FROM Backlog b WHERE b.project_id.project_id = :project_id AND b.type = :type")
    List<Backlog> getItemsByProjectId(Integer project_id, String type);

    @Modifying
    @Transactional
    @Query("DELETE  FROM Backlog b WHERE b.epic.item_id = :epic_id")
    int deleteByEpicId(Integer epic_id);
}
