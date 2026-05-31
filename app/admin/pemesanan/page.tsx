'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { SmallStatsCard } from '@/components/admin/SmallStatsCard';
import FilterTabs, { FilterTab } from '@/components/admin/FilterTabs';
import BookingTable, { BookingData } from '@/components/admin/BookingTable';
import ManageBookingModal from '@/components/admin/ManageBookingModal';
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal';
import { EmptySearch, EmptyData } from '@/components/ui/EmptyState';
import Pagination from '@/components/ui/Pagination';
import toast from 'react-hot-toast';

// Sample booking data
const bookingsData: BookingData[] = [
  {
    id: '1',
    customerName: 'Bambang',
    company: 'PT. Amerta Jaya',
    packageName: 'Paket Bali Premium',
    contact: '081026461691',
    bookingCode: 'BAMH760',
    status: 'dikonfirmasi'
  },
  {
    id: '2',
    customerName: 'Sigit',
    company: 'PT. Amerta Jaya',
    packageName: 'Paket Bali Ekonomis',
    contact: '082276529644',
    bookingCode: 'BHRS937',
    status: 'pending'
  },
  {
    id: '3',
    customerName: 'Dewi Kusuma',
    company: 'CV. Maju Bersama',
    packageName: 'Paket Yogyakarta Premium',
    contact: '085612345678',
    bookingCode: 'DEWK123',
    status: 'dikonfirmasi'
  },
  {
    id: '4',
    customerName: 'Andi Wijaya',
    company: 'PT. Sukses Makmur',
    packageName: 'Paket Bandung Ekonomis',
    contact: '081234567890',
    bookingCode: 'ANDW456',
    status: 'dibatalkan'
  },
  {
    id: '5',
    customerName: 'Mbak Esy',
    company: 'PT A',
    packageName: 'Paket B&B Premium',
    contact: '081234567891',
    bookingCode: 'MBLS789',
    status: 'dibatalkan'
  },
  {
    id: '6',
    customerName: 'Siti Nurhaliza',
    company: 'CV. Berkah Jaya',
    packageName: 'Paket Lombok Premium',
    contact: '085612345679',
    bookingCode: 'SITN321',
    status: 'dibatalkan'
  }
];

export default function AdminPemesananPage() {
  const [activeTab, setActiveTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedBookingForManage, setSelectedBookingForManage] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Calculate stats first so they are available for filterTabs
  const totalBookings = bookingsData.length;
  const confirmedCount = bookingsData.filter(b => b.status === 'dikonfirmasi').length;
  const pendingCount = bookingsData.filter(b => b.status === 'pending').length;
  const cancelledCount = bookingsData.filter(b => b.status === 'dibatalkan').length;

  // Filter tabs configuration
  const filterTabs: FilterTab[] = [
    {
      id: 'semua',
      label: 'Semua Pesanan',
      count: totalBookings,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      id: 'dikonfirmasi',
      label: 'Dikonfirmasi',
      count: confirmedCount,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M16.6667 5L7.5 14.1667L3.33334 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: 'bg-[#d0fae5]'
    },
    {
      id: 'pending',
      label: 'Pending',
      count: pendingCount,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 6.25V10L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-[#fef3c6]'
    },
    {
      id: 'dibatalkan',
      label: 'Dibatalkan',
      count: cancelledCount,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      color: 'bg-[#ffe2e2]'
    }
  ];

  const handleDeleteSelected = () => {
    if (selectedBookings.length === 0) {
      toast.error('Pilih pesanan yang ingin dihapus');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // TODO: Implement delete logic
    console.log('Deleting bookings:', selectedBookings);
    toast.success(`${selectedBookings.length} pesanan berhasil dihapus`);
    setSelectedBookings([]);
    setIsDeleteModalOpen(false);
  };

  const handleManageOrder = () => {
    if (selectedBookings.length === 0) {
      toast.error('Pilih pesanan yang ingin dikelola');
      return;
    }
    
    // Get the first selected booking for management
    const bookingId = selectedBookings[0];
    const booking = bookingsData.find(b => b.id === bookingId);
    
    if (booking) {
      setSelectedBookingForManage({
        id: booking.id,
        customerName: booking.customerName,
        company: booking.company,
        packageName: booking.packageName,
        bookingCode: booking.bookingCode,
        cancellationReason: 'Kesalahan Pesan Kode Perusahaan',
        userNotes: 'Kurang Pengunjung dari Luring 4 Cyl',
        status: booking.status
      });
      setIsManageModalOpen(true);
    }
  };

  // Filter and search logic
  const getFilteredBookings = () => {
    let filtered = bookingsData;

    // Filter by status
    if (activeTab !== 'semua') {
      filtered = filtered.filter(booking => booking.status === activeTab);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredBookings = getFilteredBookings();

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  // Reset to page 1 when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      
      <main className="flex-1 md:ml-64 bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6] min-h-screen p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#101828] tracking-tight font-['Segoe_UI'] mb-1">
              Kelola Pemesanan Pelanggan
            </h1>
            <p className="text-base text-[#6a7282] font-['Segoe_UI']">
              Monitor dan kelola semua pemesanan
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDeleteSelected}
              disabled={selectedBookings.length === 0}
              className="bg-[#e7000b] text-white px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 h-11 hover:bg-[#c10007] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 5H17.5M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333M3.33333 5L4.16667 15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333L16.6667 5M7.5 5V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-['Segoe_UI'] hidden sm:inline">Hapus</span>
            </button>
            
            <button
              onClick={handleManageOrder}
              className="bg-gradient-to-r from-[#009966] to-[#00bc7d] text-white px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 h-11 hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M14.1667 2.5L17.5 5.83333L14.1667 9.16667M17.5 5.83333H10C8.61929 5.83333 7.29341 6.38125 6.32948 7.34518C5.36555 8.30911 4.81763 9.63499 4.81763 11.015V11.6667M5.83333 17.5L2.5 14.1667L5.83333 10.8333M2.5 14.1667H10C11.3807 14.1667 12.7066 13.6187 13.6705 12.6548C14.6345 11.6909 15.1824 10.365 15.1824 8.98433V8.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-['Segoe_UI']">Kelola Pesanan</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs 
            tabs={filterTabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <SmallStatsCard
            title="Total Pesanan"
            value={totalBookings.toString()}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            bgColor="bg-[#dbeafe]"
            iconColor="text-[#3b82f6]"
          />
          
          <SmallStatsCard
            title="Dikonfirmasi"
            value={confirmedCount.toString()}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            bgColor="bg-[#d0fae5]"
            iconColor="text-[#009966]"
            valueColor="text-[#009966]"
          />
          
          <SmallStatsCard
            title="Pending"
            value={pendingCount.toString()}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 7.5V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            bgColor="bg-[#fef3c6]"
            iconColor="text-[#e17100]"
            valueColor="text-[#e17100]"
          />
          
          <SmallStatsCard
            title="Dibatalkan"
            value={cancelledCount.toString()}
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            }
            bgColor="bg-[#ffe2e2]"
            iconColor="text-[#e7000b]"
            valueColor="text-[#e7000b]"
          />
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#f3f4f6] rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                viewBox="0 0 20 20" 
                fill="none"
              >
                <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan nama, perusahaan, atau kode booking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 border border-[#e5e7eb] rounded-2xl text-base font-['Segoe_UI'] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-[#009966] focus:border-transparent"
              />
            </div>
            
            <button className="h-12 px-6 border border-[#e5e7eb] rounded-2xl flex items-center gap-2 text-[#364153] hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 5.83333H17.5M5 10H15M7.5 14.1667H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-['Segoe_UI']">Filter Lanjutan</span>
            </button>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {filteredBookings.length > 0 ? (
            <>
              <BookingTable 
                data={paginatedBookings}
                onSelectionChange={setSelectedBookings}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredBookings.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                  setItemsPerPage(newItemsPerPage);
                  setCurrentPage(1);
                }}
              />
            </>
          ) : (
            <div className="p-12">
              {searchQuery || activeTab !== 'semua' ? (
                <EmptySearch 
                  message="Tidak ada pemesanan yang cocok dengan pencarian Anda"
                  actionLabel="Reset Filter"
                  onAction={() => {
                    setSearchQuery('');
                    setActiveTab('semua');
                  }}
                />
              ) : (
                <EmptyData 
                  message="Belum ada pemesanan"
                  description="Pemesanan dari pelanggan akan muncul di sini"
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Manage Booking Modal */}
      {isManageModalOpen && selectedBookingForManage && (
        <ManageBookingModal
          isOpen={isManageModalOpen}
          onClose={() => {
            setIsManageModalOpen(false);
            setSelectedBookingForManage(null);
          }}
          bookingData={selectedBookingForManage}
          onSave={(data) => {
            console.log('Updated booking status:', data);
            // TODO: Implement API call to update booking status
            setSelectedBookings([]);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Apakah Anda yakin ingin menghapus ${selectedBookings.length} pemesanan yang dipilih?`}
      />
    </div>
  );
}
