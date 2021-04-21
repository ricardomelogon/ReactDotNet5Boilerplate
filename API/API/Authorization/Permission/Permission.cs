namespace API.Authorization
{
    public enum Permission : ushort
    {
        /// <summary>
        /// <para><b>Group:</b> System</para>
        /// <para><b>Description:</b> Error, Locked or Removed</para>
        /// </summary>
        Locked = 0,

        /// <summary>
        /// <para><b>Group:</b> System</para>
        /// <para><b>Description:</b> System administrator</para>
        /// </summary>
        SystemAdmin = 1,


        /// <summary>
        /// <para><b>Group:</b> Client</para>
        /// <para><b>Description:</b> Clients use the app</para>
        /// </summary>
        Client = 2,

        /// <summary>
        /// <para><b>Group:</b> Administrator</para>
        /// <para><b>Description:</b> Administrators control the app</para>
        /// </summary>
        Administrator = 3,

        /// <summary>
        /// <para><b>Group:</b> System</para>
        /// <para><b>Description:</b> This allows the user to access every feature</para>
        /// </summary>
        AccessAll = ushort.MaxValue,
    }
}