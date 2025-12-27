"use client";

import type { AccountSettingsViewModel } from "@/src/domain/entities/accountTypes";
import { mockAccountRepository } from "@/src/infrastructure/repositories/mockAccountRepository";
import { useEffect, useState } from "react";
import { MainLayout } from "../layouts";
import styles from "./AccountView.module.css";

export function AccountView() {
  const [account, setAccount] = useState<AccountSettingsViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("membership");

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    setLoading(true);
    const data = await mockAccountRepository.getAccountSettingsViewModel();
    setAccount(data);
    setLoading(false);
  };

  if (loading || !account) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading account settings...</p>
      </div>
    );
  }

  return (
    <MainLayout>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Account</h1>
      </header>

      <div className={styles.content}>
        {/* Membership & Billing */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>MEMBERSHIP & BILLING</h2>
          
          <div className={styles.membershipCard}>
            <div className={styles.membershipInfo}>
              <div className={styles.email}>{account.user.email}</div>
              <div className={styles.memberSince}>Member since {account.memberSince}</div>
              <button className={styles.linkButton}>Change email</button>
              <button className={styles.linkButton}>Change password</button>
            </div>
            
            <div className={styles.billingInfo}>
              <div className={styles.planBadge}>
                <span className={styles.planName}>{account.subscriptionDetails.planName}</span>
                <span className={styles.planQuality}>{account.subscriptionDetails.videoQuality}</span>
              </div>
              <div className={styles.nextBilling}>
                Next billing date: {account.nextBillingDate}
              </div>
              <button className={styles.linkButton}>Manage payment info</button>
              <button className={styles.linkButton}>Billing details</button>
            </div>
          </div>

          <div className={styles.planDetails}>
            <div className={styles.planRow}>
              <span className={styles.planLabel}>Your plan</span>
              <span className={styles.planValue}>{account.subscriptionDetails.planName} ({account.subscriptionDetails.price})</span>
              <button className={styles.changeButton}>Change plan</button>
            </div>
          </div>
        </section>

        {/* Plan Details */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>PLAN DETAILS</h2>
          
          <div className={styles.featuresGrid}>
            {account.subscriptionDetails.features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Profile & Parental Controls */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>PROFILE & PARENTAL CONTROLS</h2>
          
          <div className={styles.profilesList}>
            {account.user.profiles.length > 0 ? (
              account.user.profiles.map((profile) => (
                <ProfileRow key={profile.id} profile={profile} />
              ))
            ) : (
              <div className={styles.noProfiles}>
                <p>No profiles found</p>
              </div>
            )}
          </div>
        </section>

        {/* Security & Privacy */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>SECURITY & PRIVACY</h2>
          
          <div className={styles.settingsList}>
            <SettingRow 
              label="Sign out of all devices"
              description="Sign out of all devices except this one"
              action="Sign out"
            />
            <SettingRow 
              label="Download devices"
              description="Manage devices that can download titles"
              action="Manage"
            />
            <SettingRow 
              label="Access and devices"
              description="View recent account access and manage devices"
              action="View"
            />
          </div>
        </section>

        {/* Settings */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>SETTINGS</h2>
          
          <div className={styles.settingsList}>
            <SettingRow 
              label="Test participation"
              description="Include this account in tests and previews"
              action="Manage"
            />
            <SettingRow 
              label="Manage download devices"
              description="View and manage devices that can download"
              action="Manage"
            />
            <SettingRow 
              label="Communication settings"
              description="Manage email preferences"
              action="Manage"
            />
          </div>
        </section>
      </div>
    </div>
    </MainLayout>
  );
}

interface ProfileRowProps {
  profile: {
    id: string;
    name: string;
    avatarUrl: string;
    avatarColor: string;
    isKidsProfile: boolean;
    maturityLevel: string;
  };
}

function ProfileRow({ profile }: ProfileRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.profileRow}>
      <div 
        className={styles.profileHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <div className={styles.profileInfo}>
          <div 
            className={styles.profileAvatar}
            style={{ backgroundColor: profile.avatarColor }}
          >
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.profileDetails}>
            <span className={styles.profileName}>{profile.name}</span>
            {profile.isKidsProfile && (
              <span className={styles.kidsBadge}>KIDS</span>
            )}
          </div>
        </div>
        <span className={`${styles.expandIcon} ${expanded ? styles.expanded : ""}`}>
          ▼
        </span>
      </div>
      
      {expanded && (
        <div className={styles.profileSettings}>
          <div className={styles.profileSettingRow}>
            <span>Language</span>
            <button className={styles.linkButton}>English</button>
          </div>
          <div className={styles.profileSettingRow}>
            <span>Viewing Restrictions</span>
            <button className={styles.linkButton}>{profile.maturityLevel}</button>
          </div>
          <div className={styles.profileSettingRow}>
            <span>Profile Lock</span>
            <button className={styles.linkButton}>Off</button>
          </div>
          <div className={styles.profileSettingRow}>
            <span>Viewing Activity</span>
            <button className={styles.linkButton}>View</button>
          </div>
          <div className={styles.profileSettingRow}>
            <span>Playback Settings</span>
            <button className={styles.linkButton}>Manage</button>
          </div>
        </div>
      )}
    </div>
  );
}

interface SettingRowProps {
  label: string;
  description: string;
  action: string;
}

function SettingRow({ label, description, action }: SettingRowProps) {
  return (
    <div className={styles.settingRow}>
      <div className={styles.settingInfo}>
        <span className={styles.settingLabel}>{label}</span>
        <span className={styles.settingDescription}>{description}</span>
      </div>
      <button className={styles.actionButton}>{action}</button>
    </div>
  );
}

export default AccountView;
