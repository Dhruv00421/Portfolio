import { Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

// Custom Artstation Icon Component
const ArtstationIcon = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 50 50" 
    width="24" 
    height="24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M 20 4 A 1.0001 1.0001 0 0 0 19.132812 5.4980469 L 42.132812 45.498047 A 1.0001 1.0001 0 0 0 43.894531 45.447266 L 47.941406 37.353516 C 48.684341 35.865149 48.639219 34.100405 47.818359 32.652344 L 33.019531 6.5351562 C 32.13285 4.9703519 30.469469 4 28.669922 4 L 20 4 z M 21.728516 6 L 28.669922 6 C 29.752375 6 30.745978 6.5802888 31.279297 7.5214844 L 46.078125 33.638672 C 46.571265 34.508611 46.599408 35.565303 46.152344 36.460938 L 42.9375 42.886719 L 21.728516 6 z M 15.996094 11 A 1.0001 1.0001 0 0 0 15.138672 11.492188 L 5.1386719 28.492188 A 1.0001 1.0001 0 0 0 6 30 L 27 30 A 1.0001 1.0001 0 0 0 27.839844 28.457031 L 16.839844 11.457031 A 1.0001 1.0001 0 0 0 15.996094 11 z M 16.041016 13.904297 L 25.162109 28 L 7.7480469 28 L 16.041016 13.904297 z M 3 35 A 1.0001 1.0001 0 0 0 2.125 36.486328 L 7.125 45.486328 A 1.0001 1.0001 0 0 0 8 46 L 36 46 A 1.0001 1.0001 0 0 0 36.875 44.513672 L 31.875 35.513672 A 1.0001 1.0001 0 0 0 31 35 L 3 35 z M 4.7011719 37 L 30.412109 37 L 34.298828 44 L 8.5878906 44 L 4.7011719 37 z"/>
  </svg>
);

const DiscordIcon = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.19.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function ContactPage() {
  const contactLinks = [
    {
      type: 'email',
      label: 'Email',
      value: 'bdhruv0541@gmail.com',
      href: 'mailto:bdhruv0541@gmail.com',
      icon: Mail,
      color: 'hover:text-blue-600'
    },
    {
      type: 'github',
      label: 'GitHub',
      value: 'Dhruv00421',
      href: 'https://github.com/Dhruv00421',
      icon: Github,
      color: 'hover:text-gray-700'
    },
    {
      type: 'instagram',
      label: 'Instagram',
      value: 'cg_crafts_041',
      href: 'https://www.instagram.com/cg_crafts_041/',
      icon: Instagram,
      color: 'hover:text-pink-600'
    },
    {
      type: 'artstation',
      label: 'ArtStation',
      value: 'bamaniya dhruv',
      href: 'https://www.artstation.com/cgcraft041',
      icon: ArtstationIcon,
      color: 'hover:text-blue-500'
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: 'Dhruv Bamaniya',
      href: 'https://www.linkedin.com/in/dhruv-bamaniya-998862261/',
      icon: Linkedin,
      color: 'hover:text-blue-700'
    },
    {
      type: 'discord',
      label: 'Discord',
      value: 'Dhruv',
      href: 'https://discordapp.com/users/838032054980575302',
      icon: DiscordIcon,
      color: 'hover:text-blue-700'
    },

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 ">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-11 leading-tight">
            Let's Connect
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto px-4 sm:px-0">
            I'd love to hear from you. Reach out through any of these platforms.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-6">
          {contactLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.type}
                href={link.href}
                target={link.type === 'email' ? '_self' : '_blank'}
                rel={link.type === 'email' ? '' : 'noopener noreferrer'}
                className="group"
              >
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-gray-300">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`p-2 sm:p-3 rounded-lg bg-gray-50 transition-colors duration-300 group-hover:bg-gray-100 flex-shrink-0`}>
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-colors duration-300 ${link.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                        {link.label}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-500 transition-colors duration-300 truncate">
                        {link.value}
                      </p>
                    </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 hidden sm:block">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-500 text-xs sm:text-sm">
            Looking forward to connecting with you!
          </p>
        </div>
      </div>
    </div>
  );
}