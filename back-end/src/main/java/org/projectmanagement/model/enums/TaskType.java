package org.projectmanagement.model.enums;

public enum TaskType {

    research("critical"),
    refactor("refactor"),
    chore("chore"),
    bug("bug"),
    feature("feature");

    private final String displayName;

    TaskType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}


