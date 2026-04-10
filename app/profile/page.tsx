import { profile } from '@/data/profile';

export default function ProfilePage() {
  return (
    <section className="card">
      <h1>个人资料</h1>
      <p><strong>姓名：</strong>{profile.name}</p>
      <p><strong>所在城市：</strong>{profile.city}</p>
      <p><strong>目标岗位：</strong>{profile.position}</p>
      <p><strong>邮箱：</strong><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      <p><strong>电话：</strong><a href={`tel:${profile.phone}`}>{profile.phone}</a></p>
      <p><strong>GitHub：</strong><a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></p>
      <h2>个人简介</h2>
      <ul>
        {profile.bio.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="hint">提示：你可以将头像放到 <code>public/avatar.jpg</code> 后，我可以帮你把头像加入页面。</p>
    </section>
  );
}
