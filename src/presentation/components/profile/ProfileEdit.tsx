"use client";

import type { ProfileEditViewModel } from "@/src/domain/entities/accountTypes";
import { AVATAR_OPTIONS } from "@/src/domain/entities/types";
import { mockAccountRepository } from "@/src/infrastructure/repositories/mockAccountRepository";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ProfileEdit.module.css";

interface ProfileEditViewProps {
  profileId: string;
}

export function ProfileEditView({ profileId }: ProfileEditViewProps) {
  const router = useRouter();
  const [viewModel, setViewModel] = useState<ProfileEditViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Edit state
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<{ url: string; color: string } | null>(null);
  const [language, setLanguage] = useState("en");
  const [maturityLevel, setMaturityLevel] = useState("TV-MA");
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  const loadProfile = async () => {
    setLoading(true);
    const data = await mockAccountRepository.getProfileEditViewModel(profileId);
    if (data) {
      setViewModel(data);
      setName(data.profile.name);
      setSelectedAvatar({ url: data.profile.avatarUrl, color: data.profile.avatarColor });
      setLanguage(data.profile.language);
      setMaturityLevel(data.profile.maturityLevel);
      setIsKidsProfile(data.profile.isKidsProfile);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!selectedAvatar) return;
    
    setSaving(true);
    await mockAccountRepository.updateProfile(profileId, {
      name,
      avatarUrl: selectedAvatar.url,
      avatarColor: selectedAvatar.color,
      language,
      maturityLevel: maturityLevel as any,
      isKidsProfile,
    });
    setSaving(false);
    router.push("/profiles");
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this profile?")) {
      const success = await mockAccountRepository.deleteProfile(profileId);
      if (success) {
        router.push("/profiles");
      } else {
        alert("Cannot delete the last profile");
      }
    }
  };

  if (loading || !viewModel) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Edit Profile</h1>
        
        <div className={styles.profileForm}>
          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <div 
              className={styles.currentAvatar}
              style={{ backgroundColor: selectedAvatar?.color }}
              onClick={() => setShowAvatarPicker(true)}
            >
              <span className={styles.avatarLetter}>
                {name.charAt(0).toUpperCase() || "?"}
              </span>
              <div className={styles.editOverlay}>
                <span>Edit</span>
              </div>
            </div>
            
            {showAvatarPicker && (
              <div className={styles.avatarPickerOverlay} onClick={() => setShowAvatarPicker(false)}>
                <div className={styles.avatarPicker} onClick={(e) => e.stopPropagation()}>
                  <h3>Choose Avatar</h3>
                  <div className={styles.avatarGrid}>
                    {AVATAR_OPTIONS.map((avatar) => (
                      <button
                        key={avatar.id}
                        className={`${styles.avatarOption} ${selectedAvatar?.color === avatar.color ? styles.selected : ""}`}
                        style={{ backgroundColor: avatar.color }}
                        onClick={() => {
                          setSelectedAvatar({ url: avatar.url, color: avatar.color });
                          setShowAvatarPicker(false);
                        }}
                      >
                        <span>{name.charAt(0).toUpperCase() || "?"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Name */}
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              maxLength={20}
            />
          </div>

          {/* Language */}
          <div className={styles.formGroup}>
            <label>Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={styles.select}
            >
              {viewModel.availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Maturity Level */}
          <div className={styles.formGroup}>
            <label>Maturity Level</label>
            <select
              value={maturityLevel}
              onChange={(e) => setMaturityLevel(e.target.value)}
              className={styles.select}
              disabled={isKidsProfile}
            >
              {viewModel.maturityLevels.map((level) => (
                <option key={level.rating} value={level.rating}>
                  {level.rating} - {level.description}
                </option>
              ))}
            </select>
          </div>

          {/* Kids Profile Toggle */}
          <div className={styles.formGroup}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={isKidsProfile}
                onChange={(e) => {
                  setIsKidsProfile(e.target.checked);
                  if (e.target.checked) {
                    setMaturityLevel("TV-Y");
                  }
                }}
                className={styles.checkbox}
              />
              <span className={styles.toggleText}>Kids Profile</span>
              <span className={styles.toggleDescription}>
                Only shows content appropriate for children
              </span>
            </label>
          </div>

          {/* Game Handle (if not kids profile) */}
          {!isKidsProfile && (
            <div className={styles.formGroup}>
              <label>Game Handle</label>
              <input
                type="text"
                placeholder="Enter a unique handle"
                className={styles.input}
                maxLength={16}
              />
              <span className={styles.helperText}>
                Your handle is a unique name that you can use to play games with other members
              </span>
            </div>
          )}

          {/* Autoplay Settings */}
          <div className={styles.formGroup}>
            <label>Autoplay controls</label>
            <div className={styles.autoplayOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked className={styles.checkbox} />
                Autoplay next episode in a series on all devices
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked={!isKidsProfile} className={styles.checkbox} />
                Autoplay previews while browsing on all devices
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              onClick={handleSave}
              disabled={saving || !name.trim()}
              className={styles.saveButton}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => router.push("/profiles")}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditView;
