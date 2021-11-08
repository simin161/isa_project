package model.beans;
import model.enums.TargetType;

public class UserFeedback {

	private int id;
	private String content;
	private int authorId;
	private int targetId;
	private TargetType targetType;
	public int getId() {
		return id;
	}
	public String getContent() {
		return content;
	}
	public int getAuthorId() {
		return authorId;
	}
	public int getTargetId() {
		return targetId;
	}
	public TargetType getTargetType() {
		return targetType;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setAuthorId(int authorId) {
		this.authorId = authorId;
	}
	public void setTargetId(int targetId) {
		this.targetId = targetId;
	}
	public void setTargetType(TargetType targetType) {
		this.targetType = targetType;
	}
	
}
