﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using API.Authorization;

namespace FeatureAuthorize.PolicyCode
{
    public class AuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("CodeQuality", "IDE0052:Remove unread private members", Justification = "Base options value should be defined for the policy provider even if not explicitly used within this file")]
        private readonly AuthorizationOptions _options;

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1062:Validate arguments of public methods", Justification = "This method is only used in conjunction with the authorization process and does not require null validation")]
        public AuthorizationPolicyProvider(IOptions<AuthorizationOptions> options) : base(options)
        {
            _options = options.Value;
        }

        public override async Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            //Unit tested shows this is quicker (and safer - see link to issue above) than the original version
            return await base.GetPolicyAsync(policyName)
                   ?? new AuthorizationPolicyBuilder()
                       .AddRequirements(new PermissionRequirement(policyName))
                       .Build();
        }
    }
}